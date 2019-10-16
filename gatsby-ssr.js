const React = require("react")
const config = require('./data/siteConfig')

const modoProd = process.env.NODE_ENV && process.env.NODE_ENV === "production"

const headerScripts = modoProd ? [
    <script
        key="1"
        type="text/javascript"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    />,
    <script
        key="2"
        dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "${config.googleAdsenseID}",
                enable_page_level_ads: true
                });` }} />
] : [];


exports.onRenderBody = ({
    setHeadComponents,
    setPreBodyComponents,
    setPostBodyComponents,
}) => {
    setHeadComponents(headerScripts)
    setPreBodyComponents([

    ])
    setPostBodyComponents([

    ])
}