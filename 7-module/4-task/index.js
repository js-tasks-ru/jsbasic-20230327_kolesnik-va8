export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement("div");
    this.elem.classList.add("slider");

    this.sliderThumb = document.createElement("div");
    this.sliderThumb.classList.add("slider__thumb");
    this.sliderThumb.style = "left: 50%";
    this.elem.append(this.sliderThumb);
    this.sliderThumb.ondragstart = () => false;

    this.sliderThumbSpan = document.createElement("span");
    this.sliderThumbSpan.classList.add("slider__value");
    this.sliderThumbSpan.textContent = this.value;
    this.sliderThumb.append(this.sliderThumbSpan);

    this.sliderProgress = document.createElement("div");
    this.sliderProgress.classList.add("slider__progress");
    this.sliderProgress.style = "width: 50%";
    this.sliderThumb.after(this.sliderProgress);

    this.sliderSteps = document.createElement("div");
    this.sliderSteps.classList.add("slider__steps");
    this.sliderProgress.after(this.sliderSteps);
    for (let i = 1; i <= steps; i++) {
      let step = document.createElement(`span`);
      step.classList.add(`step${i}`);
      this.sliderSteps.append(step);
      if (step.classList.contains("step1")) {
        step.classList.add("slider__step-active");
      }
    }

    this.elem.addEventListener("pointerup", this.sliderChange);
    this.sliderThumb.addEventListener("pointerdown", this.startMoving);

    this.elem.addEventListener("click", this.onClick);
    this.elem.addEventListener("click", this.sliderChange);
  }

  render() {}

  sliderChange = () => {
    let sliderEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(sliderEvent);
  };

  startMoving = () => {
    this.elem.classList.add("slider_dragging");
    this.sliderThumb.style.position = "absolute";
    this.sliderThumb.addEventListener("pointermove", this.moving);
    this.sliderThumb.addEventListener("pointerup", this.finishMoving);
  };

  moving = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let leftPercents = leftRelative * 100;
    this.sliderThumb.style.left = `${leftPercents}%`;
    this.sliderProgress.style.width = `${leftPercents}%`;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    this.sliderThumbSpan.textContent = this.value;
    let spanActive = this.value + 1;
    let spans = this.elem.querySelectorAll(".slider__steps > span");
    for (let span of spans) {
      if (span.classList.contains(`step${spanActive}`)) {
        span.classList.add("slider__step-active");
      } else {
        span.classList.remove("slider__step-active");
      }
    }
  };

  finishMoving = () => {
    this.sliderThumb.removeEventListener("pointerup", this.startMoving);
    this.sliderThumb.removeEventListener("pointermove", this.moving);
    this.elem.classList.remove("slider_dragging");
    this.sliderThumb.finishMoving = null;
  };

  onClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    this.value = Math.round(leftRelative * segments);
    let valuePercents = (this.value / segments) * 100;
    this.sliderThumbSpan.textContent = this.value;
    let spanActive = this.value + 1;
    let spans = this.elem.querySelectorAll(".slider__steps > span");
    for (let span of spans) {
      if (span.classList.contains(`step${spanActive}`)) {
        span.classList.add("slider__step-active");
      } else {
        span.classList.remove("slider__step-active");
      }
    }
    this.sliderThumb.style.left = `${valuePercents}%`;
    this.sliderProgress.style.width = `${valuePercents}%`;
  };
}
