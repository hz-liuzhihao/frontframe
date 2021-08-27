/*
 * 封装 restful 请求
 *
 * GET、POST、DELETE、PATCH
 * 主要作用为统一处理相关事务：
 *  - 统一处理请求前缀；
 *  - 统一打印请求信息；
 *  - 统一打印响应信息；
 *  - 统一打印报错信息；
 */
import 'dart:async';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:test/application.dart';

bool _isToLogin = false;

class DioUtils {
  /// global dio object
  static Dio dio = DioUtils._createInstance();

  /// default options
  static const int CONNECT_TIMEOUT = 10000;
  static const int RECEIVE_TIMEOUT = 3000;

  /// http request methods
  static const String GET = 'get';
  static const String POST = 'post';
  static const String PUT = 'put';
  static const String PATCH = 'patch';
  static const String DELETE = 'delete';

  ///Post请求测试
  static Future<Map> post<T>(
    String url,
    BuildContext context, {
    Map<String, dynamic> parameters,
    Function(T t) onSuccess,
    Function(String error) onError,
  }) async {
    ///定义请求参数
    parameters = parameters ?? {};
    //参数处理
    parameters.forEach((key, value) {
      if (url.indexOf(key) != -1) {
        url = url.replaceAll(':$key', value.toString());
      }
    });

    Map<String, dynamic> headers = {
      "ua": "clientApp",
      "Cookie": "token=" + GlobalData.getToken()
    };
    var result;
    try {
      Response response;
      response = await dio.post(
        url,
        data: parameters,
        options: Options(
          headers: headers,
        ),
      );
      result = response.data;
      if (response.statusCode == 200) {
        if (result != null && (result['code'] == -1 || result["code"] == 100)) {
          throw Exception(result['msg']);
        }
        if (onSuccess != null) {
          onSuccess(result);
        }
      } else if (response.statusCode == 401) {
        if (!_isToLogin) {
          _isToLogin = true;
          String currentName = ModalRoute.of(context).settings.name;
          if (currentName != RouterName.login) {
            Navigator.of(context)
                .pushNamed('login', arguments: null)
                .then((value) {
              _isToLogin = false;
            });
          }
        }
      } else {
        String message =
            result != null ? result['msg'] : '错误响应码:${response.statusCode}';
        throw Exception(message);
      }
      // print('响应数据：' + response.toString());
    } on DioError catch (e) {
      String message = '';
      if (e.type == DioErrorType.connectTimeout) {
        message = '连接服务器超时';
      } else if (e.type == DioErrorType.other) {
        Exception error = e.error;
        if (error is SocketException) {
          message = '服务器开小差了，请稍后再试';
        }
      }
      Fluttertoast.showToast(
        msg: message,
        backgroundColor: Colors.red[400],
        textColor: Color(0xffffffff),
        gravity: ToastGravity.TOP,
      );
      if (onError != null) {
        onError(e.toString());
      }
      throw Error();
    } catch (e) {
      // print('请求出错：' + e.toString());
      Fluttertoast.showToast(
        msg: e.message,
        backgroundColor: Colors.red[400],
        textColor: Color(0xffffffff),
        gravity: ToastGravity.TOP,
      );
      if (onError != null) {
        onError(e.toString());
      }
      throw Error();
    }
    return result ?? {};
  }

  /// request method
  //url 请求链接
  //parameters 请求参数
  //metthod 请求方式
  //onSuccess 成功回调
  //onError 失败回调
  static Future<Map> request<T>(String url, BuildContext context,
      {parameters,
      method,
      Function(T t) onSuccess,
      Function(String error) onError}) async {
    parameters = parameters ?? {};
    method = method ?? 'GET';

    /// 请求处理
    parameters.forEach((key, value) {
      if (url.indexOf(key) != -1) {
        url = url.replaceAll(':$key', value.toString());
      }
    });

    /// 打印:请求地址-请求方式-请求参数
    // print('请求地址：【' + method + '  ' + url + '】');
    // print('请求参数：' + parameters.toString());

    //请求结果
    var result;
    Map<String, dynamic> headers = {
      "ua": "clientApp",
      "Cookie": "token=" + GlobalData.getToken()
    };
    try {
      Response response = await dio.request(
        url,
        data: parameters,
        options: new Options(
          method: method,
          headers: headers,
        ),
      );
      result = response.data;
      if (response.statusCode == 200) {
        if (result != null && result['code'] == -1) {
          throw Exception(result['message']);
        }
        if (onSuccess != null) {
          onSuccess(result);
        }
      } else if (response.statusCode == 530) {
        if (!_isToLogin) {
          _isToLogin = true;
          String currentName = ModalRoute.of(context).settings.name;
          if (currentName != RouterName.login) {
            Navigator.of(context)
                .pushNamed('login', arguments: null)
                .then((value) {
              _isToLogin = false;
            });
          }
        }
      } else {
        String message =
            result != null ? result['message'] : '错误响应码:${response.statusCode}';
        throw Exception(message);
      }
    } on DioError catch (e) {
      // print('请求出错：' + e.toString());
      Exception error = e.error;
      String message = '';
      if (error is SocketException) {
        message = '服务器开小差了，请稍后再试';
      }
      Fluttertoast.showToast(
        msg: message,
        backgroundColor: Colors.red[400],
        textColor: Color(0xffffffff),
        gravity: ToastGravity.TOP,
      );
      if (onError != null) {
        onError(e.toString());
      }
      throw Error();
    } catch (e) {
      Fluttertoast.showToast(
        msg: e.message,
        backgroundColor: Colors.red[400],
        textColor: Color(0xffffffff),
        gravity: ToastGravity.TOP,
      );
      if (onError != null) {
        onError(e.toString());
      }
      throw Error();
    }
    return result ?? {};
  }

  static Future<Map> upload(
    String url,
    FormData data,
    BuildContext context, {
    Function(Map result) onSuccess,
    Function(String error) onError,
  }) async {
    Map result;
    Map<String, dynamic> headers = {
      "ua": "clientApp",
      "Cookie": "token=" + GlobalData.getToken()
    };
    try {
      Response response;
      response = await dio.post(
        url,
        data: data,
        options: Options(headers: headers),
      );
      result = response.data;
      if (response.statusCode == 200) {
        if (result != null && result['code'] == -1) {
          throw Exception(result['msg']);
        }
      } else if (response.statusCode == 401) {
        Navigator.of(context).pushNamed('login', arguments: null);
      } else {
        String message =
            result != null ? result['msg'] : '错误响应码:${response.statusCode}';
        throw Exception(message);
      }
    } on DioError catch (e) {
      String message = '';
      if (e.type == DioErrorType.connectTimeout) {
        message = '连接服务器超时';
      } else if (e.type == DioErrorType.other) {
        Exception error = e.error;
        if (error is SocketException) {
          message = '服务器开小差了，请稍后再试';
        }
      }
      Fluttertoast.showToast(
        msg: message,
        backgroundColor: Colors.red[400],
        textColor: Color(0xffffffff),
        gravity: ToastGravity.TOP,
      );
      if (onError != null) {
        onError(e.toString());
      }
      throw Error();
    } catch (e) {
      // print('请求出错：' + e.toString());
      Fluttertoast.showToast(
        msg: e.message,
        backgroundColor: Colors.red[400],
        textColor: Color(0xffffffff),
        gravity: ToastGravity.TOP,
      );
      if (onError != null) {
        onError(e.toString());
      }
      throw Error();
    }
    if (onSuccess != null) {
      onSuccess(result);
    }
    return result ?? {};
  }

  /// 创建 dio 实例对象
  static Dio _createInstance() {
    /// 全局属性：请求前缀、连接超时时间、响应超时时间
    var options = BaseOptions(
      connectTimeout: 15000,
      receiveTimeout: 15000,
      responseType: ResponseType.json,
      validateStatus: (status) {
        // 不使用http状态码判断状态，使用AdapterInterceptor来处理（适用于标准REST风格）
        return true;
      },
      baseUrl: API_PREFIX,
    );

    return new Dio(options);
  }

  /// 清空 dio 对象
  static clear() {
    dio = null;
  }
}
