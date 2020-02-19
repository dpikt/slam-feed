import React from 'react'
import { useAsync } from 'react-use'
// import logo from './logo.svg'
import { format } from 'date-fns'
import './App.css'
import './skeleton.css'
const { request } = require('gaxios')

function fetchSlams() {
  return request({
    url: 'http://localhost:8080/api/slams',
  }).then(({ data }) => data)
}

function App() {
  const { value: slams, loading, error } = useAsync(async () => {
    return fetchSlams()
  }, [])
  if (error) throw error // i wanna see it
  console.log({ slams, loading })
  return (
    <div>
      <h1>Things (and people) that have been slammed</h1>
      {!slams || loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {slams.map(({ slammer, slammee, time, url }, i) => (
            <li key={i}>
              <strong>{slammee}</strong> was slammed by{' '}
              <strong>{slammer}</strong>
              <ul>
                <li>
                  {format(new Date(time), 'M/dd/yy h:mm a')} -{' '}
                  <a href={url}>Source</a>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  )
}

export default App
