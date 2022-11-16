
function PaginationProducts(props) {
  const numberPages = [];
  var numbePagesReder;
  for (let i = 1; i <= props.totalPages; i++) {
    numberPages.push(i);
  }
  if (props.currentPage > props.totalPages) props.setPagePagination(0)
  if (props.totalPages > 10)  numbePagesReder = numberPages.slice(props.currentPage-1, props.currentPage+10); else numbePagesReder = numberPages;

  return (
    <>
      <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">

        <div className="btn-group me-2" role="group" aria-label="Second group">
          <button type="button" className="btn btn-sm btn-danger" onClick={() => props.setPagePagination(0)} ><i className="fa-solid fa-angles-left"></i></button>
          <button type="button" disabled={props.currentPage ===1} className="btn btn-sm btn-danger" onClick={() => props.setPagePagination(props.currentPage-2)} ><i className="fa-solid fa-chevron-left"></i></button>
        </div>

        <div className="btn-group me-2" role="group" aria-label="First group">
          {numbePagesReder.map(n => (
            n === props.currentPage ?
              (<button type="button" className="btn btn-sm btn-danger" key={n}>{n}</button>) :
              (<button type="button" className="btn btn-sm btn-outline-danger" key={n} onClick={() => props.setPagePagination(n - 1)} >{n}</button>)
          ))}
          
        </div>
        <div className="btn-group me-2" role="group" aria-label="Second group">
          <button  type="button" disabled={props.currentPage ===props.totalPages}  className="btn btn-sm btn-danger" onClick={() => props.setPagePagination(props.currentPage)}><i className="fa-solid fa-angle-right"></i></button>
          <button type="button" className="btn btn-sm btn-danger" onClick={() => props.setPagePagination(props.totalPages - 1)} ><i className="fa-solid fa-angles-right"></i></button>
        </div>

      </div>
    </>

  );
}

export default PaginationProducts;