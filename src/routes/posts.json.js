export const get = async () => {

    const posts = import.meta.globEager( "../**/*.md" );

    const menu = []
    for ( let key  of Object.keys( posts )) {
        const path = key.split("/").splice(2)
        const createSubmenu = index => {

            if ( index === path.length - 1 ) {
                return { slug: "/" + path.join("/").replace("index.md", ""), content: posts[ key ].default, meta: posts[ key ].metadata }
            } 
            else {
                if ( menu[ menu.length - 1 ].sub ) {

                    menu[ menu.length -1 ].sub = [ ...menu[ menu.length - 1 ].sub, createSubmenu( index + 1 ) ] 
                } 
                else {
                    menu[ menu.length - 1 ].sub = [ createSubmenu( index + 1 ) ]
                }
                
                return menu.pop() 
            }
        }


        menu.push( createSubmenu(1) )
    }

    const sortByChapNo = (f, s)=> {
        // console.log( "Chap #", parseFloat( s.meta.chapter ), s.meta.title )
        if ( s.sub ) s.sub.sort( sortByChapNo )
        
        return !!f.meta.chapter && s.meta.chapter 
        ?
        parseFloat(f.meta.chapter) - parseFloat(s.meta.chapter) 
        :
        1
    }  
    
    menu.sort( sortByChapNo )

    return {
        status: 200,
        body: {
            menu
        }
    }
}