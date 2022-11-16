

export default function Starv2({star, setStar}) {
  return(
    <div className="d-flex flex-row">
                  <i className={star.star1 ? 'fa fa-star text-danger fa-2x' : 'fa fa-star fa-2x'} onClick={() => star.star1 && !star.star2 && !star.star3 && !star.star4 && !star.star5 ? setStar({
                    star1: false,
                    star2: false,
                    star3: false,
                    star4: false,
                    star5: false,
                    }) : setStar({
                      star1: true,
                      star2: false,
                      star3: false,
                      star4: false,
                      star5: false,
                      }) }></i>
                  <i className={star.star2 ? 'fa fa-star text-danger fa-2x' : 'fa fa-star fa-2x'} onClick={() => setStar({
                    star1: true,
                    star2: true,
                    star3: false,
                    star4: false,
                    star5: false,
                    })}></i>
                    <i className={star.star3 ? 'fa fa-star text-danger fa-2x' : 'fa fa-star fa-2x'} onClick={() => setStar({
                    star1: true,
                    star2: true,
                    star3: true,
                    star4: false,
                    star5: false,
                    })}></i>
                    <i className={star.star4 ? 'fa fa-star text-danger fa-2x' : 'fa fa-star fa-2x'} onClick={() => setStar({
                    star1: true,
                    star2: true,
                    star3: true,
                    star4: true,
                    star5: false,
                    })}></i>
                    <i className={star.star5 ? 'fa fa-star text-danger fa-2x' : 'fa fa-star fa-2x'} onClick={() => setStar({
                    star1: true,
                    star2: true,
                    star3: true,
                    star4: true,
                    star5: true,
                    })}></i>
                </div>
  )
}