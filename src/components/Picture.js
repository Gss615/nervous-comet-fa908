import React from 'react';
import _ from 'lodash';

import {withPrefix} from '../utils';

export default class Picture extends React.Component {
    render() {
        let image = _.get(this.props, 'image', null);
        let alt = _.get(this.props, 'alt', null);
        let cssClass = _.get(this.props, 'cssClass', null);
        return (
            image && (
                <picture>
                    {/* <div style={{width:`200px`,height:`200px`,overflow:`hidden`}}> */}
                        <img src={withPrefix(image)} {...(alt ? ({alt: alt}) : null)}  {...(cssClass ? ({className: cssClass}) : null)}/>
                    {/* </div> */}
                </picture>  
            )
        );
    }
}
