class Painter_Starfield {
    // Custom properties from element's style to look for
    static get inputProperties() { 
        return ['--star-array']; 
    }

    // Whether Alpha is allowed?
    static get contextOptions() {
        return { alpha: true };
    }

    paint(ctx, size, props, args) {
        let stars = JSON.parse((props.get("--star-array").toString()));

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, size.width, size.height);

        this.paint_stars(stars, ctx, size);
        ctx.closePath();
    }

    paint_stars(stars, ctx, size) {
        const len = stars.length;
        let star, colour;
        for (let i = 0; i < len; i++) {
            star = stars[i];
            colour = `rgb(${255/star.z}, ${255/star.z}, ${255/star.z})`;
            
            // paint the actual star
            ctx.beginPath();
            ctx.fillStyle = colour;
            ctx.fillRect(star.x, star.y, 1, 1);
            ctx.closePath();
        }
    }
}

registerPaint("starfield", Painter_Starfield);
