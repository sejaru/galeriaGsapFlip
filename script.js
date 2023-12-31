document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(Flip);

    const gallery = document.querySelector(".gallery");
    const imgPreview = document.querySelector(".imgPreview");
    const imgs = document.querySelectorAll(".imgContainer");

    let isimgPreviewOpen = false;
    let activeImg = null;
    let activeImgParent = null;

    imgs.forEach((img) => {
        let theImgMask = img.querySelector(".wrap");
        let theImg = img.querySelector(".img");

        img.addEventListener("click", () => {
            gsap.registerPlugin(Flip);
            const imgState = Flip.getState([theImgMask, theImg]);
            gsap.set(imgPreview, {autoAlpha: 1});
            activeImg = theImgMask;
            activeImgImg = theImgMask.querySelector("img");
            activeImgParent = theImgMask.parentNode;
            imgPreview.appendChild(theImgMask);

            Flip.from(imgState, {
                duration: 1,
                ease: "power3.inOut",
                scale: true,
                onStart: () => {
                    imgPreview.classList.add("imgPreview--active");
                },
                onComplete: () => {
                    isimgPreviewOpen = true;
                }
            });
        });
    });

    imgPreview.addEventListener("click", function (e) {
        console.log(e.target);
        const activeImgState = Flip.getState([activeImg, activeImgImg]);

        activeImgParent.appendChild(activeImg);

        Flip.from(activeImgState, {
            duration: 1,
            ease: "power.inOut",
            absolute: true,
            zIndex : 2000,
            nested: true,
            onStart:() => {
                imgPreview.classList.remove("imgPreview--active");
            },
            onComplete: () => {
                isimgPreviewOpen = false;
                gsap.set(imgPreview, {autoAlpha: 0})
            }
        });
    });
});
