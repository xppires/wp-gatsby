import React, { Component } from 'react';
import { FacebookProvider, Comments } from 'react-facebook';
import useSiteMetadata from '../hooks/use-site-config'

const FacebookComments = (props) => {

    const { facebookAppId, siteUrl } = useSiteMetadata()
    if (!facebookAppId) {
        return null
    }
    const url = `${siteUrl}${props.slug}`
    return (
        <FacebookProvider appId={facebookAppId}>
            <Comments href={url} />
        </FacebookProvider>
    );

}
export default FacebookComments