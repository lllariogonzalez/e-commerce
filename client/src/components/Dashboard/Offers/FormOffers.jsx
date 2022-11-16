import axios from "axios";
import { React, useState, useEffect } from "react";
import isAdmin from "../../../utils/isAdmin";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCategories } from "../../../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import Transition from "../../Transition/Transition";


export default function FormOffers() {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector((state) => state.categories);

  const [input, setInput] = useState({
    event: "",
    discount: 0,
    startDay: "",
    endDay: "",
  });

  const [errors, setErrors] = useState({
    event: "Enter a valid event name",
    discount: "Enter a valid discount percentage",
    startDay: "Enter a valid start date to apply the discount",
    endDay: "Enter a valid end date to apply the discount",
  });

  const [category, setCategory] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [brands, setBrands] = useState("");
  const [brandSelected, setBrandSelected] = useState([]);
  const [allbrands, setAllBrands] = useState([]);
  const [catDetail, setCatDetail] = useState('');
  const [brandDetail, setBrandDetail] = useState('');

  const [admin, setAdmin] = useState();
  const { getAccessTokenSilently } = useAuth0();

  
  useEffect(() => {
    isAdmin(getAccessTokenSilently)
      .then((res) => setAdmin(res))
      .catch(() => setAdmin(false));
    dispatch(getCategories(""));
  }, [admin]);

  useEffect(() => {
    axios
      .get(`/product/brand?category=${category ? category : ""}`)
      .then((response) => setAllBrands(response.data));
  }, [category]);

  useEffect(() => {
    if (!allbrands.find((brand) => brand === brands)) setBrands("");
  }, [allbrands]);

  
  function validate(input) {
    if (!input.event || input.event.length < 3) errors.event = "Enter a valid event name";
    else errors.event = "";

    if (input.discount <= 0 || input.discount > 100)
      errors.discount = "Enter a valid discount percentage";
    else errors.discount = "";

    if (!input.startDay || !validateDate(input.startDay))
      errors.startDay = "Enter a valid start date to apply the discount";
    else errors.startDay = "";

    if (!input.endDay || !validateDate(input.endDay) || !validateToday(input.endDay, input.startDay))
      errors.endDay = "Enter a valid end date to apply the discount";
    else errors.endDay = "";

    return errors;
  }

  function validateDate(date){
   let dated = date.split('-');
   let year = Number(dated[0]);
   let month = Number(dated[1]);
   let day = Number(dated[2]);
   let today = new Date();
   let valid = 0;

   if(year >= today.getFullYear()) valid++;
   else valid--;

   if(month >= today.getMonth()) valid++;
   else valid--;

   if(day >= today.getDate()) valid++;
   else valid--;

   if (valid > 1) return true
   else return false;
  }

  function validateToday(end, start){
   let enddated = end.split("-");
   let endyear = Number(enddated[0]);
   let endmonth = Number(enddated[1]);
   let endday = Number(enddated[2]);
   let startdated = start.split("-");
   let startyear = Number(startdated[0]);
   let startmonth = Number(startdated[1]);
   let startday = Number(startdated[2]);
   let valid = 0;

   if(endyear < startyear) valid--;
   else valid++;

   if(endmonth < startmonth) valid--;
   else valid++;

   if(endday <= startday) valid--;
   else valid++;

   if (valid > 1) return true;
   else return false;
  }
  

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCategory(e){
    if(e.target.checked && !categorySelected.find(c=>c===Number(e.target.id))){
      setCategorySelected([...categorySelected, e.target.id]);
    }else{
      setCategorySelected(categorySelected.filter(c => c !== e.target.id));
    }
   setCategory(e.target.id);
  }

  function handleBrand(e){
   if(e.target.checked && !brandSelected.find(c=>c===e.target.id)){
    setBrandSelected([...brandSelected, e.target.id]);
  }else{
    setBrandSelected(brandSelected.filter(c => c !== e.target.id));
  }
    setBrands(e.target.id);                      
  }

    function getDetails(){
      let response = '';
      if(catDetail === 'All'){
        response=catDetail;
      }else{
       const detailsCat = categories.map(c=>{
          if(categorySelected.map(c=>Number(c)).includes(c.id)){
            return c.category;
          }
        });
        response=detailsCat.filter(c=>!!c).join("-");
     }
     if(brandDetail === 'All'){
      response = response.concat(`/${brandDetail}`)
     }else{
      response = response.concat(`/${brandSelected.join("-")}`);
     }

     return response;
    }
    

  async function handleClick(e) {
    e.preventDefault();
    try {
      let details = getDetails();
      const token = await getAccessTokenSilently();
      await axios.post(
        "/offer",
        {
          CategoryId: categorySelected,
          brand: brandSelected,
          offer: {
            event: input.event,
            startDay: input.startDay,
            endDay: input.endDay,
            discount: input.discount,
            detail: details
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Offer created successfully");
    } catch (error) {
      toast.error("Error, please enter valid information");
    }
    setInput({
      event: "",
      discount: 0,
      startDay: "",
      endDay: "",
      products: [],
    });
    history.push("/dashboard/offers");
  }

  return (
    <Transition>
      <div>
        <h1 className="text-center py-2  text-danger">Create an offer</h1>
        <Form className="w-75 mx-auto">
          <Form.Group className="mb-3" controlId="offerEvent">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              name="event"
              value={input.event}
              onChange={(e) => handleChange(e)}
              placeholder="Enter a event name"
            />
            {errors.event && (
              <Form.Text className="text-muted">{errors.event}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="offerDiscount">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              value={input.discount}
              onChange={(e) => handleChange(e)}
              placeholder="Enter a discount percentage"
            />
            {errors.discount && (
              <Form.Text className="text-muted">{errors.discount}</Form.Text>
            )}
          </Form.Group>
          <div className="row">
            <Form.Group className="mb-3 col-6" controlId="offerStartDay">
              <Form.Label>Starts at</Form.Label>
              <Form.Control
                type="date"
                name="startDay"
                value={input.startDay}
                onChange={(e) => handleChange(e)}
                placeholder="Enter a start date"
              />
              {errors.startDay && (
                <Form.Text className="text-muted">{errors.startDay}</Form.Text>
              )}
            </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="offerEndDay">
            <Form.Label>Ends at</Form.Label>
              <Form.Control
                type="date"
                name="endDay"
                value={input.endDay}
                onChange={(e) => handleChange(e)}
                placeholder="Enter an end date"
              />
              {errors.endDay && (
                <Form.Text className="text-muted">{errors.endDay}</Form.Text>
              )}
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="offerProducts">
            <Form.Label>Products to apply discount</Form.Label>
            <div className="row mx-1 my-1"></div>
            <Form.Label>Filter by:</Form.Label>
            <div className="row mx-1 my-1"></div>
            <Form.Label>Categories</Form.Label>

            <div className="row mx-1 my-1">
              <div className="col-xl-3 col-md-4 col-sm-4 col-4 form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="category"
                  id="all"
                  onChange={(e) => {
                    setCategory("");
                    if(e.target.checked){
                      let categoriesId = categories.map(e => e.id);
                      setCategorySelected([...categoriesId]);
                      setCatDetail('All')
                    }else{
                      setCategorySelected([]);
                      setCatDetail('')
                    }
                  }}
                />
                <label className="form-check-label fw-semibold" htmlFor="all">
                  All
                </label>
              </div>
              {categorySelected?.length!==6 ? categories.map((element) => {
                return (
                  <div
                    key={element.id}
                    className="col-xl-3 col-md-4 col-sm-4 col-4 form-check"
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="category"
                      id={element.id}
                      onChange={(e) => {
                        handleCategory(e);
                      }}
                    />
                    <label
                      className="form-check-label fw-semibold"
                      htmlFor={element.id}
                    >
                      {`${element.category[0].toUpperCase()}${element.category.slice(
                        1
                      )} `}
                    </label>
                  </div>
                );
              }): <></>}
            </div>
            <Form.Label>Brands</Form.Label>
            <Form.Group className="mb-3" controlId="offerProducts">
              <div className="row mx-1 my-1">
                <div className="col-xl-3 col-md-4 col-sm-6 col-6 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="brand"
                    id="allBrands"
                    onChange={(e) => {
                      setBrands("");
                      if(e.target.checked){
                        setBrandSelected([...allbrands]);
                        setBrandDetail('All')
                    }else{
                      setBrandSelected([]);
                      setBrandDetail("");
                    }
                    }}
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="allBrands"
                  >
                    All
                  </label>
                </div>
                {allbrands && brandSelected.length !== 28 ?
                  allbrands.map((b) => (
                    <div
                      key={b}
                      className="col-xl-3 col-md-4 col-sm-6 col-6 form-check"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="brand"
                        id={b}
                        onChange={(e) => {
                         handleBrand(e);
                        }}
                      />
                      <label
                        className="form-check-label fw-semibold"
                        htmlFor={b}
                      >
                        {b}
                      </label>
                    </div>
                  )): <></>}
              </div>
            </Form.Group>
            <div className="row mx-1 my-1"></div>
          </Form.Group>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-4">
              <Link to="/dashboard/offers">
                <Button className="column-3" variant="danger">
                  <i className="fa-solid fa-left-long"></i>
                </Button>
              </Link>
            </div>
            <div className="col-4">
              <Button
                className="column-3"
                variant="danger"
                type="submit"
                onClick={(e) => handleClick(e)}
                disabled={
                  errors.event ||
                  errors.discount ||
                  errors.startDay ||
                  errors.endDay   ||
                  categorySelected.length === 0 ||
                  brandSelected.length === 0                
                }
              >
                Submit
              </Button>
              <div><br/></div>
            </div>
          </div>
          <ToastContainer />
        </Form>
      </div>
    </Transition>
  );
 }