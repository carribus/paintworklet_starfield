window.addEventListener('load', () => {
    const button = document.querySelector("#starfield");
    if ('paintWorklet' in CSS) {
        // for some reason, I've noticed that addModule constructs the PaintWorklet twice
        // It is for this reason that the starfield logic and state needed to move outside of the
        // worklet class
        CSS.paintWorklet.addModule("starfield.painter.js").then(() => {
            button.addEventListener("click", () => {
                let dimensions = { w: button.clientWidth, h: button.clientHeight };
                let stars = create_star_array(dimensions, 100);
                button.classList.add('animating');
                button.style.setProperty("--star-array", JSON.stringify(stars));
    
                let last = performance.now();
                requestAnimationFrame(function raf(now) {
                    if (now-last > 50) {
                        move_stars(stars, dimensions);
                        button.style.setProperty("--star-array", JSON.stringify(stars));
                        last = now;
                    }
                    requestAnimationFrame(raf);
                });
            });
        });
    } else {
        document.body.innerHTML = "You need support for CSS Paint API to run this properly";
    }
})

function create_star_array(size, numStars) {
    let stars = [];

    console.log(`Initialising ${numStars} stars`);
    for (let i = 0; i < numStars; i++ ) {
        stars.push({
            x: Math.floor(Math.random()*size.w),
            y: Math.floor(Math.random()*size.h),
            z: Math.floor(Math.random()*4),
        })
    }

    return stars;
}

function move_stars(stars, size) {
    const len = stars.length;
    for (let i = 0; i < len; i++) {
        let star = stars[i];
        star.x += 5-star.z;

        if (star.x > size.w) {
            star.x = 0;
        }
    }

}