const { Order, Product, OrderDetail, Offer, User } = require("../db");
const { Op } = require("sequelize");
const emailNotifications = require("../utils/emailNotifications.js");
const message = require("../utils/emailMessages");
const { sendMessage } = require("../../whatsapp/whatsappBot");
const { client } = require('../../whatsapp/whatsappBot.js');


const getOrders = async (req, res) => {
    const pageNumber = Number.parseInt(req.query.page);
    const sizeNumber = Number.parseInt(req.query.size);
    let orderBy      = req.query.orderBy;
    let orderAs      = req.query.orderAs;
    const filter     = req.query.filter;

    let page  = 0;
    let size  = 12;
    if(!Number.isNaN(pageNumber) && pageNumber > 0) page = pageNumber;
    if(!Number.isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 12) size = sizeNumber;
    if(!orderBy) orderBy="createdAt";
    if(!orderAs) orderAs="DESC";

    if(filter !== "all"){
      try{
        const orders = await Order.findAndCountAll({
            where: {
              status: filter
            },
            order: [[orderBy, orderAs]],
            limit: size,
            offset: page * size
        });
        return res.status(200).json({
            totalPages: Math.ceil(orders.count / size), 
            orders: orders.rows
        })
    }catch{
        res.status(404).json({ error: "Product not found" });
    }}
    else{
      try{
        const orders = await Order.findAndCountAll({
            order: [[orderBy, orderAs]],
            limit: size,
            offset: page * size
        });
        return res.status(200).json({
            totalPages: Math.ceil(orders.count / size), 
            orders: orders.rows
        })
    }catch{
        res.status(404).json({ error: "Product not found" });
    }
    }
    
};

const getOrdersById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: {id},
      include: {model: Product, attributes: {exclude: ['OfferId']}, include: Offer }
    });

    order
      ? res.status(200).json(order)
      : res.json("Order not found or ID invalid");
  } catch (error) {
    res.json(error.message);
  }
};

const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orderBy = [["id", "DESC"]];
    const order = await Order.findAll({
      where: {
        user_email: email
      },
      include: {model: Product, attributes: {exclude: ['OfferId']}, include: Offer },
      order: orderBy
    });

    order.length !== 0
      ? res.status(200).send(order)
      : res.json("Order not found or email invalid");
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const postOrder = async (req, res) => {
  let order = req.body;
  let { products } = order;

  try {
    let orderDB = await Order.create(order);

    products?.map(async (e) => {
      let productDB = await Product.findByPk(e.id);
      await orderDB.addProduct(productDB, { through : { units: e.quantity}});
    });

    let user = await User.findOne({where:{email: orderDB.user_email}});
    if(client.authStrategy.clientId && updateData.phone) sendMessage(`${user.phone}@c.us`, `${message.purchase} \n\n Order Number:  ${orderDB.id} \n Shipping address: _${orderDB.shipping_address}_ \n\n *TECNOSHOP*` )

    emailNotifications(orderDB.user_email,"Information about your purchase", message.purchase);

    return res.status(200).json(orderDB.id);
    
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { updateStatus } = req.body;

    await Order.update(
      { status : updateStatus },
      {
        where: {
          id,
        },
      }
    );

    let orderDB = await Order.findByPk(id);
    let user = await User.findOne({where:{email: orderDB.user_email}});
    
    
    let msg =
    orderDB.status === "in process"
    ? message.statusInProcess
    : orderDB.status === "delivered"
    ? message.statusDelivered
    : orderDB.status === "received"
    ? message.statusReceived
    : orderDB.status === "pending"
    ? message.statusPending
    : message.statusCancelled 
    
    //if(user.phone) sendMessage(`${user.phone}@c.us`, `${msg} \n\n Order Number:  ${orderDB.id} \n Order Status:  ${orderDB.status} \n\n *TECNOSHOP*` )
    emailNotifications(orderDB.user_email, 'Information about your purchase', msg);

    if(orderDB.status === 'cancelled'){
     const unitsDB = await OrderDetail.findAll({
       where: { id: id },
       attributes: ["ProductId", "units"],
     });
     const units = unitsDB.map((e) => ({ id: e.ProductId, qty: e.units }));
     units.map(
       async (e) =>
         await Product.increment({ stock: +e.qty }, { where: { id: e.id } })
     );
    }
    
    res.status(200).json("Order updated successfully");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let {status} = req.body;
    
    let oldStock = false;

    if(status==="rejected") {
     status="cancelled"
     oldStock= true
    }
    if(status==="approved") status="in process"
    if(status==="in_process") status="pending"
    if(status==="pending") status="pending"
     
     await Order.update(
       { status: status },
       {
         where: {
           id: Number(id),
          },
        }
        );

    let orderDB = await Order.findByPk(id);

    let msg =
      orderDB.status === "in process"
        ? message.statusInProcess
        : orderDB.status === "delivered"
        ? message.statusDelivered
        : orderDB.status === "received"
        ? message.statusReceived
        : orderDB.status === "pending"
        ? message.statusPending
        : message.statusCancelled 

        emailNotifications(orderDB.user_email, 'Information about your purchase', msg);

        if(oldStock){
         const unitsDB = await OrderDetail.findAll({     
         where: {OrderId: id},
         attributes:['ProductId','units']    
         });
         const units = unitsDB.map(e => ({id: e.ProductId, qty: e.units}));
         units.map(async (e) => await Product.increment({stock: +e.qty}, {where:{id: e.id}}));     
        }
    
        res.status(200).json("Status updated successfully");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getOrders,
  getOrdersByEmail,
  postOrder,
  updateOrder,
  getOrdersById,
  updateStatus
};
