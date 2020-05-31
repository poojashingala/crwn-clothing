import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';

export default function* RootSaga() {
    yield all([
        call(fetchCollectionsStart)
    ]);
}