import React from 'react';

export default function PreviewId({value, onSubmit, idIsValid}) {
  let refInput;
  const state = idIsValid && 'checkmark' || 'cross';
  return (
    <form onSubmit={(e) => onSubmit(refInput.value)} className="id-form component flex">
      <label htmlFor="id">ID</label>
      <div className="input grow">
        <input ref={(input) => refInput = input} id="id" type="text" name="id" defaultValue={value} placeholder="Skriv id her"/>
        <span className={`state ${state}`}></span>
      </div>
      <button className="submit small" onClick={() => onSubmit(refInput.value)}>Opdater</button>
    </form>
  );
}

PreviewId.propTypes = {
  value: React.PropTypes.string,
  idIsValid: React.PropTypes.string,
  onSubmit: React.PropTypes.func
};
