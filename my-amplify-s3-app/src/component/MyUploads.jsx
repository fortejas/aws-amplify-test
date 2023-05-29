import { Authenticator } from '@aws-amplify/ui-react'


import { Gallery } from './Gallery'
import { Upload } from './Upload'

export function MyUploads({ nav }) {
  return <>
    <p>{ nav }</p>
    <Authenticator loginMechanisms={['email']} socialProviders={['amazon']}>
      {({ user }) => {
        return (
          <>
            <h1>My Uploads</h1>
            <div>
              <h4>User Details</h4>
              <pre>
                Username: { user.username }<br/>
                Email: { user.attributes.email }
              </pre>
            </div>

            <Upload />

            <h3>My Gallery</h3>

            <Gallery level={'protected'} />
          </>
        )
      }}
    </Authenticator>
  </>
}
