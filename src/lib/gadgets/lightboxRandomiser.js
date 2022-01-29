export default function throwAround( images ) { 
    const angle = Math.round( 36 / images.length ) * 10
    return "<style>" + images.map(( _ , i)=>`#lightbox picture.spread-out-by-${ angle * ( i + 1 ) } { transform: translate(-50%, -60%) scale(.4) rotate( ${10 * i + 20 - Math.random()*40}deg ) translateX( calc( 1vmin * (${ 100 + Math.random()*40 }) ) rotate( ${-10 * i + 10 - Math.random()*20}deg ); }`).join(" ") + "</style>" 
}