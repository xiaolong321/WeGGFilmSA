import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="胶片">
              {getFieldDecorator('film', {
                rules: [
                  {
                    required: true,
                    message: '请输入胶片',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="显影液">
              {getFieldDecorator('developer', {
                rules: [
                  {
                    required: true,
                    message: '请输入显影液',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="稀释比例">
              {getFieldDecorator('dilution', {
                rules: [
                  {
                    required: true,
                    message: '请输入稀释比列',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="ASA/ISO">
              {getFieldDecorator('iso', {
                rules: [
                  {
                    required: true,
                    message: '请输入ISO',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={
              <span>
                35mm
                <em className={styles.optional}>（选填）</em>
              </span>
            }>
              {getFieldDecorator('a35mm', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={
              <span>
                120
                <em className={styles.optional}>（选填）</em>
              </span>
            }>
              {getFieldDecorator('a120', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={
              <span>
              页片
              <em className={styles.optional}>（选填）</em>
              </span>
            }>
              {getFieldDecorator('sheet', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="温度">
              {getFieldDecorator('temperature', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={
              <span>
              提示
              <em className={styles.optional}>（选填）</em>
              </span>
            }>
              {getFieldDecorator('note', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<TextArea style={{ minHeight: 32 }} rows={4} />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
