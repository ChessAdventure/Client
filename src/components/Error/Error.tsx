import './Error.css'

interface PropTypes {
  text: string;
}

const Error = ({ text }: PropTypes) => {
  return (
    <div className="error">
      <p>{text}</p>
    </div>
  )
}

export default Error
