import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPSPMerchantMethodsRequest } from './actions';
import CircularIndeterminate from '../../components/Loading/LoadingComponent';
import TableComponent from '../../components/tables/TableComponent';

const PSPMerchantMethods = () => {
	const dispatch = useDispatch();
	const { isLoading, pspMerchantMethods } = useSelector(
		(state) => state.pspMerchantMethods
	);

	useEffect(() => {
		dispatch(fetchPSPMerchantMethodsRequest());
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{isLoading ? (
				<CircularIndeterminate />
			) : pspMerchantMethods?.length ? (
				<TableComponent data={pspMerchantMethods} source="pspMerchantMethod" />
			) : (
				''
			)}
		</div>
	);
};

export default PSPMerchantMethods;
