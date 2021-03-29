<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Income;
use App\Expenses;
use App\Categories;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class Report{
    public $category_id;
    public $category_name;
    public $category_income;
    public $category_expenses;
}
class ReportsController extends Controller
{
    public function reports($times)
    {   
        $now = Carbon::now();
        $reports = array();
        $sum = 0;
        // $category = Categories::pluck('category_name');
        $category = Categories::all();
        foreach ($category as $cat) {
            $report = new Report;
            $income = $expenses = 0;
            if ($times == 'Yearly'){
                // DB::enableQueryLog();
                $yearStartDate = $now->startOfYear()->format('Y-m-d');
                $yearEndDate = $now->endOfYear()->format('Y-m-d');
                $income = Income::where('category_id', $cat->id)->whereBetween('starting_date', [$yearStartDate, $yearEndDate])->sum('amount');
                $expenses = Expenses::where('category_id', $cat->id)->whereBetween('starting_date', [$yearStartDate, $yearEndDate])->sum('amount');
            }elseif ($times == 'Monthly'){
                $monthStartDate = $now->startOfMonth()->format('Y-m-d');
                $monthEndDate = $now->endOfMonth()->format('Y-m-d');
                $income= Income::where('category_id', $cat->id)->whereBetween('starting_date', [$monthStartDate, $monthEndDate])->sum('amount');
                $expenses = Expenses::where('category_id', $cat->id)->whereBetween('starting_date', [$monthStartDate, $monthEndDate])->sum('amount');
            }elseif ($times == 'Weekly'){
                $weekStartDate = $now->startOfWeek()->format('Y-m-d');
                $weekEndDate = $now->endOfWeek()->format('Y-m-d');
                $income= Income::where('category_id', $cat->id)->whereBetween('starting_date', [$weekStartDate, $weekEndDate])->sum('amount');
                $expenses = Expenses::where('category_id', $cat->id)->whereBetween('starting_date', [$weekStartDate, $weekEndDate])->sum('amount');
            }else{
                return response()->json([
                    'status'=> 404,
                    'reports'=>'Not found'
                ]);
            }
            $report->category_id = $cat->id;
            $report->category_name = $cat->category_name;
            $report->category_income = $income;
            $report->category_expenses = $expenses;
            $sum+= $income - $expenses;
            array_push($reports, $report);
        }
        // $reports = $res->toJson();
        return response()->json([
            'status'=> 200,
            'sum' => $sum,
            'reports'=>$reports
        ]);
    }
}
