let gaPromise = null;

function getGA() {
    if (!gaPromise) {
        gaPromise = import('react-ga4').then(mod => {
            const ReactGA = mod.default;
            ReactGA.initialize("G-33GQEY07L1");
            return ReactGA;
        });
    }
    return gaPromise;
}

export function sendPageView(page, title) {
    getGA().then(ReactGA => {
        ReactGA.send({ hitType: "pageview", page, title });
    });
}

export function sendEvent(category, action, label, value, params) {
    getGA().then(ReactGA => {
        ReactGA.event({ category, action, label, value, params });
    });
}
