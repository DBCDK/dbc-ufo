import React from 'react';

export default function PreviewId({value, onSubmit}) {
  let refInput;
  return (
    <div className="id-form">
      <label htmlFor="id">ID</label>
      <input className="id-input grow" ref={(input) => refInput = input} id="id" type="text" name="id" defaultValue={value} placeholder="Skriv id her"/>
      <button className="submit small" onClick={() => onSubmit(refInput.value)}>Opdater</button>
    </div>
  );
}

PreviewId.propTypes = {
  value: React.PropTypes.string,
  onSubmit: React.PropTypes.func
};
