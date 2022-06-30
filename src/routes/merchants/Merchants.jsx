import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMerchantsRequest } from "./actions";
import CircularIndeterminate from "../../components/Loading/LoadingComponent";
import TableComponent from "../../components/tables/TableComponent";

const Merchants = () => {
  const dispatch = useDispatch();
  const { isLoading, merchants } = useSelector((state) => state.merchants);

  useEffect(() => {
    dispatch(fetchMerchantsRequest());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {isLoading ? (
        <CircularIndeterminate />
      ) : merchants?.length ? (
        <TableComponent data={merchants} source="merchant" />
      ) : (
        ""
      )}
    </div>
  );
};

export default Merchants;
