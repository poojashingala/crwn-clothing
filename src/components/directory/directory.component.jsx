import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';
import { selectDirectorySelectors } from '../../redux/directory/directory.selectors';

import './directory.styles.scss';

const Directory = ({ sections }) => (
    <div className="directory-menu">
        {
            sections.map(({id, ...otherProps }) => 
                (<MenuItem key={id} { ...otherProps }></MenuItem>))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySelectors
});

export default connect(mapStateToProps)(Directory);