export function KeenAutoplayWithDots(sliderRef, setCurrentSlide, setLoaded) {
    let timeout;
    let mouseOver = false;
  
    function clearNextTimeout() {
      clearTimeout(timeout);
    }
  
    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        sliderRef.current?.next();
      }, 4000);
    }
  
    return (slider) => {
      sliderRef.current = slider;
      setLoaded(true);
  
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
  
      slider.on("slideChanged", () => {
        setCurrentSlide(slider.track.details.rel);
        nextTimeout();
      });
  
      slider.on("destroyed", clearNextTimeout);
    };
  }
  