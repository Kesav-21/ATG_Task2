const sections = gsap.utils.toArray("section")
currentSection = sections[0];

gsap.defaults({ overwrite: "auto", duration: 1 });

// stretch out the body height according to however many sections there are.
gsap.set("body", { height: sections.length * 100 + "%" });

// create a ScrollTrigger for each section
sections.forEach((section, i) => {
  console.log(innerHeight);
  var tl = gsap.timeline({
    scrollTrigger: {
      // use dynamic scroll positions based on the window height (offset by half to make it feel natural)
      start: () => (i - 0.5) * innerHeight,
      end: () => (i + 0.5) * innerHeight,
      scrub: true,
      // pin: true,
      markers: false,
      // when a new section activates (from either direction), set the section accordingly.
      onToggle: (self) => self.isActive && setSection(section)
    }
  });
});

function setSection(newSection) {
  const q = gsap.utils.selector(newSection);

  if (newSection !== currentSection) {
    var tl = gsap.timeline();
    // tl.to("h1", { y: -30, autoAlpha: 0, duration: 0.3 });
    // if (q(".red")) {
    //   tl.to("#rotate", {
    //     rotate: "180",
    //     y: -50,
    //     duration: 2
    //   });
    // }
    tl.to(currentSection, { autoAlpha: 0, duration: 0.5 });

    var tl = gsap.timeline();
    tl.to(newSection, { autoAlpha: 1, duration: 0.5 });
    // tl.to("h1", { y: -30, autoAlpha: 1, duration: 0.3 });
    //tl.fromTo("h1", {y:20, autoAlpha: 0}, {y:-20, autoAlpha:1, duration:0.2});

    currentSection = newSection;
  }
}

$(document).ready(function () {
  const totalSlides = 7; // Total number of slides
  const slideHeight = $(".slide").height();
  const dashArrayMax = 1000; // Maximum value for stroke-dasharray
  const svgPath = $("#Opaque_Ring");

  $(window).on("scroll", function () {
      // Calculate the current slide based on scroll position
      const scrollTop = $(window).scrollTop();
      const currentSlide = Math.floor(scrollTop / slideHeight) + 1;

      // Calculate stroke-dasharray value based on current slide position
      const dashArrayValue = Math.min((scrollTop % slideHeight) * (dashArrayMax / slideHeight), dashArrayMax);

      // Update the stroke-dasharray property of the SVG path
      svgPath.css("stroke-dasharray", `${dashArrayValue}, ${dashArrayMax}`);
  });
});
