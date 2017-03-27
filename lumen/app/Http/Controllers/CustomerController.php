<?php 

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
use Validator;

class CustomerController extends Controller {

    public function __construct(Customer $customer) {
        $this->customer = $customer;
    }

    public function index() {
        $customers = $this->customer->query()->get();
        return response($customers);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response(['error' => $validator->errors()->all()], 422);
        }
        $customer = new $this->customer;
        $customer->name = $request->input('name');
        $customer->phone = $request->input('phone');
        $customer->address = $request->input('address');
        $customer->save();
        
        return response($customer, 201);
    }

    public function get($id) {
        $customer = $this->customer->query()->find($id);
        if($customer) {
            return response($customer);
        }
        else {
            return response(['error' => 'Not found customer for ID '. $id], 404);
        }
    }

    public function update(Request $request, $id) {
        $customer = $this->customer->query()->find($id);
        if($customer) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
            ]);
            if ($validator->fails()) {
                return response(['error' => $validator->errors()->all()], 422);
            }
            else {
                $customer = $this->customer->query()->find($id);
                $customer->name = $request->input('name');
                $customer->phone = $request->input('phone');
                $customer->address = $request->input('address');
                $customer->save();

                return response($customer);
            }
        }
        else {
            return response(['error' => 'Not found customer for ID '. $id], 404);
        }
    }

    public function delete($id) {
        $customer = $this->customer->query()->find($id);
        if($customer) {
            $this->customer->query()->findOrFail($id)->delete();
            return response(['id' => $id]);
        }
        else {
            return response(['error' => 'Not found customer for ID '. $id], 404);
        }
    }

}