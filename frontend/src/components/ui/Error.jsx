const Error = ({error}) => {
  return (
    <div className="alert alert-danger" role="alert">
        {error}
    </div>
  )
}

export default Error