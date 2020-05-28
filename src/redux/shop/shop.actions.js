import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotsToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
        collectionRef.get().then( snapshot => {
            const collectionMap = convertCollectionsSnapshotsToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionMap))
        }).catch(dispatch(error => fetchCollectionFailure(error.message)))
    }
}