export default async ( ) => {

    try {
        const posts = await fetch( '/posts.json' )
        const { menu } = await posts.json()
        return menu 
    }
    catch ({ message }) {
        console.error
    }

}