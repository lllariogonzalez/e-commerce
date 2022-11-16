import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "../../../redux/actions";
import axios from "axios";
import { toast } from "react-toastify";
import Transition from "../../Transition/Transition";

export default function Offers() {
  const dispatch = useDispatch();
  const history = useHistory();

  const allOffers = useSelector((state) => state.offers);

  React.useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  async function deleteOffer(id) {
    try {
      await axios.delete(`/offer/${id}`);
      toast.success("Offer deleted successfully");
      dispatch(getOffers());
    } catch (error) {
      toast.error("Error deleting an offer");
    }
  }

  function updateOffer(props) {
    history.push({
      pathname: `/Dashboard/Offers/Update/${props.id}`,
      state: props,
    });
  }

  async function deleteAll(){
   try {
    await axios.delete('/offer');
   toast.success("Offers deleted successfully");
   dispatch(getOffers());
   } catch (error) {
    toast.error("Error deleting offers");
   }   
  }

  return (
    <Transition>
      <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-10 py-2">
              <Link to="/Dashboard/Offers/Create" className="btn btn-primary">
                <i className="fa-solid fa-plus me-2"></i>New offer
              </Link>
            </div>
            <div className="col-2 py-2">
              <button onClick={() => deleteAll()} className="btn btn-primary">
                <i className="fa-solid fa-trash-can me-2"></i>Clear all
              </button>
            </div>
          </div>
       {
          allOffers.length === 0 ? (
        <div className="d-flex flex-column align-items-center mt-4">
          <i className="fa-solid fa-circle-exclamation fs-4 text-danger"></i>
          <p className="text-danger fw-bold fs-4 mt-2">Without Offers</p>
        </div>
      ) : (
          <div className="col-12 bg-light border border-secondary px-2 rounded shadow">
            <table className="table  table-hover text-center">
              <thead>
                <tr>
                  <th className="fw-semibold fs-6">Offer name</th>
                  <th className="fw-semibold fs-6">Discount %</th>
                  <th className="fw-semibold fs-6">Starts at</th>
                  <th className="fw-semibold fs-6">Finishes at</th>
                  <th className="fw-semibold fs-6">Apply in</th>
                  <th className="fw-semibold fs-6">Edit Offers</th>
                </tr>
              </thead>
              <tbody>
                {allOffers &&
                  allOffers.map((o) => (
                    <tr key={o.id}>
                      <td>{o.event}</td>
                      <td>{o.discount}</td>
                      <td>{o.startDay}</td>
                      <td>{o.endDay}</td>
                      <td>
                        <p style={{ margin: 0 }}>{`Categories: ${o.detail
                          .split("/")[0]
                          .toUpperCase()}`}</p>
                        <p style={{ margin: 0 }}>{`Brands: ${o.detail
                          .split("/")[1]
                          .toUpperCase()}`}</p>
                      </td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            onClick={() => deleteOffer(o.id)}
                            type="button"
                            className="btn btn-sm btn-danger"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            onClick={() =>
                              updateOffer({
                                id: o.id,
                                event: o.event,
                                discount: o.discount,
                                startDay: o.startDay,
                                endDay: o.endDay,
                              })
                            }
                            type="button"
                            className="btn btn-sm btn-warning"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>)}
        </div>      
    </Transition>
  );
}
