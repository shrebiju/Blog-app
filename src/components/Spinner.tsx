type SpinnerProps = {
    size?: string
    color?: string
  }
  
  const Spinner = ({ size = "h-8 w-8", color = "border-blue-600" }: SpinnerProps) => {
    return (
      <div className="flex justify-center items-center">
        <div
          className={`animate-spin rounded-full ${size} border-4 border-gray-200 ${color} border-t-transparent`}
        ></div>
      </div>
    )
  }
  
  export default Spinner
  