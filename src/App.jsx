import { useState } from 'react'
import './App.css'
import arrowIconUrl from './assets/icon-arrow.svg'

function App() {
  const [age, setAge] = useState({
    day: '',
    month: '',
    year: '',
    formSubmitted: false
  })

  function handleChange(event) {
    const {name, value} = event.target
    console.log('handling change')
    setAge(prevAge => ({
      ...prevAge,
      [name]: parseInt(value, 10)
    }))
    console.log(age)
  }

  function handleSubmit(event) {
    event.preventDefault()

    console.log('button clicked')

    // this only tests the logic of the ternary statements below
    setAge(prevAge => ({
      ...prevAge,
      formSubmitted: true
    }))
  }

  return (
    <div className='container'>
      <form className='form'>
        <div className="form__data-container">
          <label className='label' htmlFor="day">Day</label>
          <input
              className='input'
              type="number"
              placeholder='DD'
              name="day"
              id="day"
              value={age.day}
              onChange={handleChange}
              required
          />
        </div>

        <div className="form__data-container">
          <label className='label' htmlFor="month">Month</label>
          <input
              className='input'
              type="number"
              placeholder='MM'
              name="month"
              id="month"
              value={age.month}
              onChange={handleChange}
              required
          />
        </div>

        <div className="form__data-container">
          <label className='label' htmlFor="year">Year</label>
          <input
              className='input'
              type="number"
              placeholder='YYYY'
              name="year"
              id="year"
              value={age.year}
              onChange={handleChange}
              required
          />
        </div>
        <button className='submit-btn' onClick={handleSubmit}><img src={arrowIconUrl} alt="down arrow" className='btn-img' /></button>
      </form>

      {/* <hr className='divider' /> */}
      

      <div className="results">
        <p className="results--text"><span className="results--number">{age.formSubmitted === false ? '--' : age.year}</span>years</p>
        <p className="results--text"><span className="results--number">{age.formSubmitted === false ? '--' : age.month}</span>months</p>
        <p className="results--text"><span className="results--number">{age.formSubmitted === false ? '--' : age.day}</span>days</p>
      </div>
    </div>
  )
}

export default App
