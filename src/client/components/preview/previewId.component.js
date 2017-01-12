import React from 'react';

export default function PreviewId({value, onSubmit}) {
  let refInput;
  return (
    <div className="id-form">
      <label htmlFor="id">ID</label>
      <input ref={(input) => refInput = input} id="id" type="text" name="id" defaultValue={value}/>
      <button onClick={() => onSubmit(refInput.value)}>Opdater</button>
    </div>
  );
}

IdForm.propTypes = {
  value: React.PropTypes.string,
  onSubmit: React.PropTypes.func
};
