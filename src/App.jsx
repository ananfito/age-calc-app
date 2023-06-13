import { useState } from 'react'
import './App.css'
import arrowIconUrl from './assets/icon-arrow.svg'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs().format()
dayjs.extend(customParseFormat)

function App() {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  const currentDate = today.getDate()
  
  const [formData, setFormData] = useState({
    birthday: '',
    birthMonth: '',
    birthYear: '',
    formSubmitted: false
  })

  const [errorMessage, setErrorMessage] = useState({})

  // Age Calculation
  // age in Years
  let ageYears = formData.birthMonth > currentMonth + 1 ? currentYear - formData.birthYear - 1 : currentYear - formData.birthYear
  
  // age in Months
  let ageMonths = formData.birthMonth > currentMonth + 1 ? (12 - formData.birthMonth) + (currentMonth + 1) : (12 - formData.birthMonth) - (currentMonth + 1)

  // age in days 
  let ageDays = currentDate >= formData.birthday ? currentDate - formData.birthday : currentDate

  // Update form data
  function handleChange(event) {
    const {name, value} = event.target
    
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
      formSubmitted: false
    }))

    document.getElementById('day').style.color = 'var(--neutral-smoke-grey)'
    document.getElementById('month').style.color = 'var(--neutral-smoke-grey)'
    document.getElementById('year').style.color = 'var(--neutral-smoke-grey)'
    document.getElementById('birthday').style.borderColor = 'var(--neutral-smoke-grey)'
    document.getElementById('birthMonth').style.borderColor = 'var(--neutral-smoke-grey)'
    document.getElementById('birthYear').style.borderColor = 'var(--neutral-smoke-grey)'
  }

  // Handle form submission 
  function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage(validator(formData))
  }

  // Validate form data
  function validator(data) {
    let errors = {}

    const birthDate = data.birthYear + '-' + data.birthMonth + '-' + data.birthday

    if (dayjs(birthDate, 'YYYY-MM-DD', true).isValid() === false) {
      document.getElementById('birthday').style.borderColor = 'var(--primary-light-red'
      document.getElementById('day').style.color = 'var(--primary-light-red)'
      document.getElementById('birthMonth').style.borderColor = 'var(--primary-light-red'
      document.getElementById('month').style.color = 'var(--primary-light-red)'
      document.getElementById('birthYear').style.borderColor = 'var(--primary-light-red'
      document.getElementById('year').style.color = 'var(--primary-light-red)'

      errors.birthday = 'Must be a valid day'
      errors.birthMonth = 'Must be a valid month'
      errors.birthYear = 'Must be in the past'
    } else if (data.birthday <= 0 || data.birthday > 31) {
      document.getElementById('birthday').style.borderColor = 'var(--primary-light-red'
      document.getElementById('day').style.color = 'var(--primary-light-red)'
      document.getElementById('birthMonth').style.borderColor = 'var(--primary-light-red'
      document.getElementById('month').style.color = 'var(--primary-light-red)'
      document.getElementById('birthYear').style.borderColor = 'var(--primary-light-red'
      document.getElementById('year').style.color = 'var(--primary-light-red)'

      errors.birthday = 'Must be a valid day'
    } else if (data.birthMonth < 0 || data.birthMonth > 12) {
      document.getElementById('birthday').style.borderColor = 'var(--primary-light-red'
      document.getElementById('day').style.color = 'var(--primary-light-red)'
      document.getElementById('birthMonth').style.borderColor = 'var(--primary-light-red'
      document.getElementById('month').style.color = 'var(--primary-light-red)'
      document.getElementById('birthYear').style.borderColor = 'var(--primary-light-red'
      document.getElementById('year').style.color = 'var(--primary-light-red)'

      errors.birthMonth = 'Must be a valid month'
    } else if (data.birthYear > currentYear) {
      document.getElementById('birthday').style.borderColor = 'var(--primary-light-red'
      document.getElementById('day').style.color = 'var(--primary-light-red)'
      document.getElementById('birthMonth').style.borderColor = 'var(--primary-light-red'
      document.getElementById('month').style.color = 'var(--primary-light-red)'
      document.getElementById('birthYear').style.borderColor = 'var(--primary-light-red'
      document.getElementById('year').style.color = 'var(--primary-light-red)'

      errors.birthYear = 'Must be in the past'
    } else {
      setFormData(prevFormData => ({
        ...prevFormData, 
        formSubmitted: true
      }))
    }

    return errors
  }

  return (
    <div className='container'>
      {/* FORM */}
      <form className='form' onSubmit={handleSubmit}>
        <div className="form__data-container">
          <label className='label' htmlFor="birthday" id='day'>Day</label>
          <input
              className='input'
              type="number"
              placeholder='DD'
              name="birthday"
              id="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
          />
          {errorMessage.birthday && <p className='error-msg'>{errorMessage.birthday}</p>}
        </div>

        <div className="form__data-container">
          <label className='label' htmlFor="birthMonth" id='month'>Month</label>
          <input
              className='input'
              type="number"
              placeholder='MM'
              name="birthMonth"
              id="birthMonth"
              value={formData.birthMonth}
              onChange={handleChange}
              required
          />
          {errorMessage.birthMonth && <p className='error-msg'>{errorMessage.birthMonth}</p>}
        </div>

        <div className="form__data-container">
          <label className='label' htmlFor="birthYear" id='year'>Year</label>
          <input
              className='input'
              type="number"
              placeholder='YYYY'
              name="birthYear"
              id="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              required
          />
          {errorMessage.birthYear && <p className='error-msg'>{errorMessage.birthYear}</p>}
        </div>

        <button className='submit-btn'><img src={arrowIconUrl} alt="down arrow" className='btn-img' /></button>
      </form>

      {/* RESULTS */}
      <div className="results">
        <p className="results--text">
          <span className="results--number">{formData.formSubmitted ? ageYears : '--' }</span>years
        </p>

        <p className="results--text">
          <span className="results--number">{formData.formSubmitted ? ageMonths : '--' }</span>months
        </p>

        <p className="results--text">
          <span className="results--number">{formData.formSubmitted ? ageDays : '--' }</span>days
        </p>
      </div>
    </div>
  )
}

export default App
