<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Income;
use Carbon\Carbon;
class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Income[]
     */
    public function index()
    {
        return Income::all();
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
        $income = new Income();
        $income->fill($data);
        if($income['currency']=='LL'){
            $income->amount = $income['amount']/1500;
            $income->currency = '$';
        }
        if($income['fixed_recurring'] ==1){
            $starting_date = Carbon::createFromFormat('Y-m-d', $income['starting_date']);
            $finishing_date = Carbon::createFromFormat('Y-m-d', $income['finishing_date']);
            if($income->recurring_frequency =='Yearly'){
                while($starting_date->lessThanOrEqualTo($finishing_date)){
                    $record = new Income();
                    $record->fill($data);
                    $record->amount = $income['amount'];
                    $record->currency = $income['currency'];
                    $record->starting_date = $starting_date->format('Y-m-d');
                    $record->save();
                    $starting_date->addYear();
                    // var_dump($income['starting_date']);
                }
            }else if($income->recurring_frequency =='Monthly'){
                while($starting_date->lessThanOrEqualTo($finishing_date)){
                    $record = new Income();
                    $record->fill($data);
                    $record->amount = $income['amount'];
                    $record->currency = $income['currency'];
                    $record->starting_date = $starting_date->format('Y-m-d');
                    $record->save();
                    $starting_date->addMonth();
                    // var_dump($income['starting_date']);
                }
            }else if($income->recurring_frequency =='Weekly'){
                while($starting_date->lessThanOrEqualTo($finishing_date)){
                    $record = new Income();
                    $record->fill($data);
                    $record->amount = $income['amount'];
                    $record->currency = $income['currency'];
                    $record->starting_date = $starting_date->format('Y-m-d');
                    $starting_date->addDays(7);
                    $record->save();
                    var_dump($record['starting_date']);
                }
            // }else if($income->recurring_frequency =='Daily'){
            //     while($starting_date->lessThanOrEqualTo($finishing_date)){
            //         $record = new Income();
            //         $record->fill($data);
            //         $record->amount = $income['amount'];
            //         $record->currency = $income['currency'];
            //         $record->starting_date = $starting_date->format('Y-m-d');
            //         $starting_date->addDay();
            //         $record->save();
            //         // var_dump($income['starting_date']);
            //     }
            }
        }else{
            $income->save();
        }
        return response()->json([
            'status'=> 200,
            'income'=>$income
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
        return Income:: where('id',$id)->first();
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
        $income = Income:: where('id', $id)->first();
        $income->update($data);
        if($income['currency']=='LL'){
            $income->amount = $income['amount']/1500;
            $income->currency = '$';
        }
        $income->save();

        return response()->json([
            'status'=>200,
            'income'=>$income
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
        Income:: where('id', $id)->delete();

        return response()->json([
            'status'=>200,
            'income'=> Income::all()
        ]);
    }
}
