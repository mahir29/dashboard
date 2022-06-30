import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPSPMerchantsRequest } from './actions';
import CircularIndeterminate from '../../components/Loading/LoadingComponent';
import TableComponent from '../../components/tables/TableComponent';

const PSPMerchants = () => {
	const dispatch = useDispatch();
	const { isLoading, pspMerchants } = useSelector(
		(state) => state.pspMerchants
	);

	useEffect(() => {
		dispatch(fetchPSPMerchantsRequest());
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{isLoading ? (
				<CircularIndeterminate />
			) : pspMerchants?.length ? (
				<TableComponent data={pspMerchants} source="pspMerchant" />
			) : (
				''
			)}
		</div>
	);
};

export default PSPMerchants;
