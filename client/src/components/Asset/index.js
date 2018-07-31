import AssetForm from './AssetForm';
import assetFormData from './AssetFormHOC';
import AssetList from './AssetList';
import assetListData from './AssetListHOC';
import AssetMenu from './AssetMenu';
import propTypes from './propTypes';
import fragments from './fragments';

const AssetFormWithData = assetFormData(AssetForm);
const AssetListWithData = assetListData(AssetList);

export {
  propTypes,
  fragments,
  AssetFormWithData as AssetForm,
  AssetListWithData as AssetList,
  AssetMenu,
};
