import React from 'react'
import { useAsync } from 'react-use'
// import logo from './logo.svg'
import { format } from 'date-fns'
import './App.css'
import './skeleton.css'
const { request } = require('gaxios')

function fetchSlams() {
  return request({
    url: window.location.origin + '/api/slams',
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
          {slams.map(({ slammer, slammee, time, url, plural }, i) => (
            <li key={i}>
              <strong>{slammee}</strong> {plural ? 'were' : 'was'} slammed by{' '}
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
      <footer>
        Inspiration:{' '}
        <a href="https://textio.com/blog/the-rise-of-slam-journalism/17517342693">
          The Rise of “Slam” Journalism
        </a>
      </footer>
    </div>
  )
}

export default App
