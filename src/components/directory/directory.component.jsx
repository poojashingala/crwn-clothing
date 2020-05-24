import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';
import { selectDirectorySelectors } from '../../redux/directory/directory.selectors';

import { DirectoryContainer } from './directory.styles';

const Directory = ({ sections }) => (
    <DirectoryContainer>
        {
            sections.map(({id, ...otherProps }) => 
                (<MenuItem key={id} { ...otherProps }></MenuItem>))
        }
    </DirectoryContainer>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySelectors
});

export default connect(mapStateToProps)(Directory);