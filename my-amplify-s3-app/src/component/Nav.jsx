import { Amplify } from "aws-amplify";


export function Nav({ setRoute }) {

    return <>
        <button onClick={() => setRoute('')}>Home</button>
        &nbsp;
        <button onClick={() => setRoute('uploads')}>My Uploads</button>
        &nbsp;
        <button onClick={() => Amplify.Auth.signOut() }>Sign Out</button>
    </>
}
