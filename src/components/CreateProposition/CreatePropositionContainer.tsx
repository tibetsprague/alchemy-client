import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Dispatch } from 'react-redux';

import * as arcActions from 'actions/arcActions';
import { IRootState } from 'reducers';
import { IDaoState, ICollaboratorState } from 'reducers/arcReducer';
import { IWeb3State } from 'reducers/web3Reducer'

import * as css from './CreateProposition.scss';

interface IStateProps {
  dao: IDaoState,
  daoAddress : string,
  web3: IWeb3State
}

const mapStateToProps = (state : IRootState, ownProps: any) => {
  return {
    dao: state.arc.daoList[ownProps.match.params.daoAddress],
    daoAddress : ownProps.match.params.daoAddress,
    web3: state.web3
  };
};

interface IDispatchProps {
  createProposition: typeof arcActions.createProposition
}

const mapDispatchToProps = {
  createProposition: arcActions.createProposition
};

type IProps = IStateProps & IDispatchProps

interface IState {
  avatarAddress: string,
  description: string,
  nativeTokenReward: number,
  reputationReward: number,
  ethReward: number,
  externalTokenAddress: string,
  externalTokenReward: number,
  beneficiary: string,
}

class CreatePropositionContainer extends React.Component<IProps, IState> {

  constructor(props: IProps){
    super(props);

    this.state = {
      avatarAddress: this.props.daoAddress,
      description: "",
      nativeTokenReward: 0,
      reputationReward: 0,
      ethReward: 0,
      externalTokenAddress: null,
      externalTokenReward: 0,
      beneficiary: "",
    };
  }

  handleSubmit = (event : any) => {
    event.preventDefault();
    this.props.createProposition(this.state.avatarAddress, this.state.description, this.state.nativeTokenReward, this.state.reputationReward, this.state.beneficiary);
  }

  handleChange = (event : any) => {
    const newDescription = ReactDOM.findDOMNode<HTMLInputElement>(this.refs.descriptionNode).value;
    const newNativeTokenReward = Number(ReactDOM.findDOMNode<HTMLInputElement>(this.refs.nativeTokenRewardNode).value);
    const newReputationReward = Number(ReactDOM.findDOMNode<HTMLInputElement>(this.refs.reputationRewardNode).value);
    const newBenificiary = ReactDOM.findDOMNode<HTMLInputElement>(this.refs.beneficiaryNode).value;
    this.setState({
      description: newDescription,
      nativeTokenReward: newNativeTokenReward,
      reputationReward: newReputationReward,
      beneficiary: newBenificiary
    });
  }

  render() {
    return(
      <div className={css.createPropositionWrapper}>
        <h2>Create a Contribution Proposition for DAO <i>{this.props.dao.name}</i></h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='descriptionInput'>Description: </label>
            <input
              autoFocus
              id='descriptionInput'
              onChange={this.handleChange}
              placeholder="Describe your propsoal"
              ref="descriptionNode"
              required
              size={100}
              type="text"
              value={this.state.description}
            />
            <br /><br />
            <label htmlFor='nativeTokenRewardInput'>Token reward: </label>
            <input
              id='nativeTokenRewardInput'
              maxLength={10}
              onChange={this.handleChange}
              placeholder="How many tokens to reward"
              ref="nativeTokenRewardNode"
              required
              size={10}
              type="text"
              value={this.state.nativeTokenReward}
            />
            <br /><br />
            <label htmlFor='reputationRewardInput'>Omega reward: </label>
            <input
              id='reputationRewardInput'
              maxLength={10}
              onChange={this.handleChange}
              placeholder="How much reputation to reward"
              ref="reputationRewardNode"
              required
              size={10}
              type="text"
              value={this.state.reputationReward}
            />
            <br /><br />
            <label htmlFor='beneficiaryInput'>Beneficiary: </label>
            <input
              id='beneficiaryInput'
              maxLength={42}
              onChange={this.handleChange}
              placeholder="Who to reward"
              ref="beneficiaryNode"
              required
              size={46}
              type="text"
              value={this.state.beneficiary}
            />
            <br /><br />
            <button type='submit'>Submit</button>
          </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePropositionContainer);