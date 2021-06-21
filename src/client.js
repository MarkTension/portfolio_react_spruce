import sanityClient from "@sanity/client"

export default sanityClient({
    projectId: "5qkm1oa2",
    dataset: "production",
    useCdn: true
});

