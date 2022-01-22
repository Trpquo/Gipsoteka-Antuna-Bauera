export const get = async () => {

    const posts = import.meta.globEager( "../**/*.md" );
    const jpegs = Object.keys( import.meta.glob( "../**/*.jpg" ) )
    const pngs = Object.keys( import.meta.glob( "../**/*.png" ) )
    const webps = Object.keys( import.meta.glob( "../**/*.webp" ) )
    const images = [ ...jpegs, ...pngs, ...webps ] // .map(url=> url.replace("../routes/", "") );

   
    const makeTree = keys => {
        const base = { sub: [] };
        
        for (const url of keys) {
          const path = url.match(/\/[^/]+/g).slice(1);
        //   console.log(path)
          
          let curr = base;
          
          path.forEach((e, i) => {
            if ( i === path.length - 1 ) return  // zato da ne duplicira podmenie zbog index.md
            const currPath = path.slice(0, i + 1).join("");
            const child = curr.sub.find(e => e.slug === currPath.replace("index.md", ""));
            
            if ( child ) {
              curr = child;
            }
            else {
              curr.sub.push({
                slug: currPath.replace("index.md", ""), 
                content: posts[ url ].default, 
                meta: posts[ url ].metadata,
                sub: []
              });
              curr = curr.sub[curr.sub.length-1];
            }
          });
        }
        
        return base.sub;
      };

    const  menu = makeTree( Object.keys( posts ) )



    const sortByChapNo = (f, s)=> {
        if ( f.meta && s.meta ) {
          if ( !!f.meta.chapter && !!s.meta.chapter ) {
            // console.log( f.meta.chapter, typeof f.meta.chapter )
            if ( typeof f.meta.chapter === "string" && typeof s.meta.chapter === "string" ) {
              return parseInt( f.meta.chapter.substring( f.meta.chapter.lastIndexOf('.') + 1, f.meta.chapter.length ) ) - parseInt( s.meta.chapter.substring( s.meta.chapter.lastIndexOf('.') + 1, s.meta.chapter.length ) )
            }
            // console.log( f.meta.chapter, isNaN(parseFloat(f.meta.chapter)), parseFloat(f.meta.chapter), typeof f.meta.chapter )
            else return parseFloat(f.meta.chapter) - parseFloat(s.meta.chapter) 
          }
        } else return 1       
    }  

    function cleanAndSortMenu( menu ) {
        // console.log( menu )

        menu.forEach(item=> {
            if ( item.sub ) {
                if ( item.sub.length === 0 ) {    
                    item.sub = false
                } else {
                    cleanAndSortMenu( item.sub ) 
                }
            }
            // console.log( "Chap #", parseFloat( item.meta.chapter ), item.meta.title, item.sub )
            
        })
        menu.sort( sortByChapNo )
    }

    cleanAndSortMenu( menu )
    

    // console.log( menu )

    return {
        status: 200,
        body: {
            menu,
            posts,
            images
        }
    }
}