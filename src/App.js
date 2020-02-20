import React from 'react'
import { useAsyncRetry } from 'react-use'
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

function deleteSlam(id) {
  return request({
    url: window.location.origin + '/api/slams/' + id,
    method: 'DELETE',
  }).then(({ data }) => data)
}

function App() {
  const {
    value: slams,
    loading,
    error,
    retry: refresh,
  } = useAsyncRetry(async () => {
    return fetchSlams()
  }, [])
  if (error) throw error // i wanna see it
  return (
    <div>
      <h1>Things (and people) that have been slammed</h1>
      {!slams || loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {slams.map(({ slammer, slammee, time, url, plural, id }, i) => (
            <li key={i}>
              <span
                onClick={async () => {
                  if (!window.ENABLE_DELETE) return
                  await deleteSlam(id)
                  refresh()
                }}
              >
                <strong>{slammee}</strong> {plural ? 'were' : 'was'} slammed by{' '}
                <strong>{slammer}</strong>
              </span>
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
