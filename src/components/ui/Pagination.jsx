import Button from "./Button";

export default function Pagination({ page, totalPages, onChangePage }) {
  return (
    <div className="flex gap-2 justify-center items-center mt-2 w-full py-2 bg-dark-accent rounded-lg">
      <Button
        className={"w-[50px]"}
        // Disabled si es igual a 1 para no ir a la pagina 0
        disabled={page === 1}
        onClick={() => onChangePage(page - 1)}
      >
        Prev
      </Button>

      <span className="w-32 font-bold">
        {/* Pagina actual y total de paginas*/}
        {page} / {totalPages}
      </span>

      {/*Cuando clicas el boton el padre suma una pagina */}
      <Button
        className={"w-[50px]"}
        //Disabled solo cuandoesta en la ultima pagina
        disabled={page === totalPages}
        onClick={() => onChangePage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
