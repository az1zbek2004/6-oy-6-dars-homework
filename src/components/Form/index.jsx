import { useRef } from "react";
import card from "../../assets/data/data.json";
import "./index.css";

function Form(props) {
  const ratingRef = useRef('');
  const maxPriceRef = useRef('');
  const minPriceRef = useRef('');
  const brandRef = useRef('');

  function vaidate(rating, maxPrice, minPrice, brand) {

    if (!rating && !maxPrice && !minPrice && !brand) {
      alert("Filter bo'sh bo'lishi mumkin emas!")
      ratingRef.current.focus()
      return false;
    }

    if (rating > 5) {
      alert(`rating 5 dan kichik bo'lishi kerak`);
      ratingRef.current.focus();
      return false;
    }

    if (maxPrice < 0) {
      alert(`maximal narx manfiy bo'lishi mumkin emas`);
      maxPriceRef.current.focus();
    }

    
    if (minPrice < 0) {
      alert(`minimal narx manfiy bo'lishi mumkin emas`);
      ratingRef.current.focus();
      return false;
    }

    if (maxPrice && minPrice) {
      if (maxPrice < minPrice) {
        alert(`maximal narx minimal narxdan katta bo'lishi kerak`);
        maxPriceRef.current.focus();
        return false;
      }
    } else {
      return true;
    }


    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (vaidate(ratingRef.current.value, maxPriceRef.current.value, minPriceRef.current.value, brandRef.current.value)) {
      props.filterCard(ratingRef.current.value, maxPriceRef.current.value, minPriceRef.current.value, brandRef.current.value);
      ratingRef.current.value = ""
      maxPriceRef.current.value = "" 
      minPriceRef.current.value = "" 
      brandRef.current.value = ""
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input--group">
        <input 
        type="number" 
        placeholder="Enter rating..."
        ref={ratingRef}
        onChange={() => {ratingRef.current.value}}
        />
        <input
          className="price"
          type="number"
          placeholder="Enter max price..."
          ref={maxPriceRef}
          onChange={() => {maxPriceRef.current.value}}
        />
        <input
          className="price"
          type="number"
          placeholder="Enter min price..."
          ref={minPriceRef}
          onChange={() => {minPriceRef.current.value}}
        />
        <input 
        type="text" 
        placeholder="Enter brand..." 
        ref={brandRef}
        onChange={() => {brandRef.current.value}}
        />
      </div>

      <button className="save--button">Filter</button>
    </form>
  );
}

export default Form;
