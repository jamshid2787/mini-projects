import toast from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';

import { Api, Mappers, Types } from 'modules/movie';
import { Form, IOption } from 'components';

import * as yup from 'yup';

interface CreateProps {
  navigate: NavigateFunction;
}

export default class Create extends Form<Types.IForm.Movie.Create, CreateProps> {
  state = {
    values: {
      title: '',
      stock: '' as unknown as number,
      rate: '' as unknown as number,
      genreId: ''
    },
    errors: {},
    isLoading: false,
    options: []
  };

  schema = yup.object({
    title: yup.string().min(5).required().label('Title'),
    stock: yup.number().min(0).max(1000).typeError('Please enter a number').label('Stock'),
    rate: yup.number().min(0).max(1000).typeError('Please enter a number').label('Rate'),
    genreId: yup.string().required().label('Genre')
  });

  doSubmit = async (values: Types.IForm.Movie.Create) => {
    this.setState({ isLoading: true });
    try {
      await Api.Movie.Create(values);
      toast.success('Movie successfully created 🎁');
      this.props.navigate('/movies');
    } catch (error: any) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const { data } = await Api.Genre.List();
      const genres = (data || []).map(Mappers.Genre);

      const options: IOption[] = genres.map(({ id, name }) => ({ value: id, label: name }));
      this.setState({ options, isLoading: false } as any);
    } catch (err: any) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="container">
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.options)}
          {this.renderInput('stock', 'Number in stock', 'number')}
          {this.renderInput('rate', 'Daily rental rate', 'number')}
          {this.renderButton('Create')}
        </form>
      </div>
    );
  }
}
