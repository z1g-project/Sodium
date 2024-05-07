let useProx = localStorage.getItem('useProxy') | false
self.__injectify$cfg = {
    useProxy: useProx,
    fsType: "localstorage",
    fsItem: "websitePlugins",
    location: "/injectify/",
    whereTo: "apploader",
    blacklist: []
}