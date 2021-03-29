<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Expenses;
use Carbon\Carbon;
class ExpensesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Expenses[]
     */
    public function index()
    {
        return Expenses::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data= $request->all();
        $expense = new Expenses();
        $expense->fill($data);
        if($expense['currency']=='LL'){
            $expense->amount = $expense['amount']/1500;
            $expense->currency = '$';
        }
        if($expense['fixed_recurring'] ==1){
            $starting_date = Carbon::createFromFormat('Y-m-d', $expense['starting_date']);
            $finishing_date = Carbon::createFromFormat('Y-m-d', $expense['finishing_date']);
            if($expense->recurring_frequency =='Yearly'){
                while($starting_date->lessThanOrEqualTo($finishing_date)){
                    $record = new Expenses();
                    $record->fill($data);
                    $record->amount = $expense['amount'];
                    $record->currency = $expense['currency'];
                    $record->starting_date = $starting_date->format('Y-m-d');
                    $record->save();
                    $starting_date->addYear();
                    // var_dump($expense['starting_date']);
                }
            }else if($expense->recurring_frequency =='Monthly'){
                while($starting_date->lessThanOrEqualTo($finishing_date)){
                    $record = new Expenses();
                    $record->fill($data);
                    $record->amount = $expense['amount'];
                    $record->currency = $expense['currency'];
                    $record->starting_date = $starting_date->format('Y-m-d');
                    $record->save();
                    $starting_date->addMonth();
                    // var_dump($expense['starting_date']);
                }
            }else if($expense->recurring_frequency =='Weekly'){
                while($starting_date->lessThanOrEqualTo($finishing_date)){
                    $record = new Expenses();
                    $record->fill($data);
                    $record->amount = $expense['amount'];
                    $record->currency = $expense['currency'];
                    $record->starting_date = $starting_date->format('Y-m-d');
                    $starting_date->addDays(7);
                    $record->save();
                    var_dump($record['starting_date']);
                }
            }else if($expense->recurring_frequency =='Daily'){
                while($starting_date->lessThanOrEqualTo($finishing_date)){
                    $record = new Expenses();
                    $record->fill($data);
                    $record->amount = $expense['amount'];
                    $record->currency = $expense['currency'];
                    $record->starting_date = $starting_date->format('Y-m-d');
                    $starting_date->addDay();
                    $record->save();
                    // var_dump($expense['starting_date']);
                }
            }
        }else{
            $expense->save();
        }
        return response()->json([
            'status'=> 200,
            'expense'=>$expense
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Expenses:: where('id',$id)->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $expense = Expenses:: where('id', $id)->first();
        $expense->update($data);
        if($expense['currency']=='LL'){
            $expense->amount = $expense['amount']/1500;
            $expense->currency = '$';
        }
        $expense->save();

        return response()->json([
            'status'=>200,
            'expense'=>$expense
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Expenses:: where('id', $id)->delete();

        return response()->json([
            'status'=>200,
            'expense'=> Expenses::all()
        ]);
    }
}
