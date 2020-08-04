import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getTasks, deleteTask, updateTask} from '../../actions/tasks';

export class Tasks extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    getTasks: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getTasks();
  }

  toggleTodoDone(event, index) {
    const tasks = [...this.props.tasks]; // copy the array
    tasks[index] = {
      ...tasks[index],
      completed: event.target.checked // update done property on copied todo
    }; // copy the todo can also use Object.assign
    this.props.updateTask(tasks[index]);
    this.setState({
      tasks
    });
  }

  render() {
    return (
      <Fragment>
        <h2>Tasks</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Task</th>
              <th>Completed</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{task.message}</td>
                <td><input type="checkbox" defaultChecked={task.completed} onChange={(event) => this.toggleTodoDone(event, index)}/></td>
                <td>
                  <button
                    onClick={this.props.deleteTask.bind(this, task.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {' '}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks.tasks,
});

export default connect(mapStateToProps, { getTasks, deleteTask, updateTask })(Tasks);
