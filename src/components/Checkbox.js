import React from 'react'

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const deafultRef = React.useRef()
  const resolvedRef = ref || deafultRef

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])


  return (
    <>
      <input type='checkbox' ref={resolvedRef} {...rest} />
    </>
  )
})

